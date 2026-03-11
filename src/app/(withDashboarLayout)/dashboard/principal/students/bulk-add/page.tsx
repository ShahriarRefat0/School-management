"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import {
    FileUp,
    Download,
    ChevronLeft,
    CheckCircle2,
    Users,
    AlertCircle,
    Info,
    RefreshCcw,
    Database,
    UploadCloud,
} from "lucide-react";
import { addMultipleStudents } from "@/app/actions/student";

export default function BulkAddStudentPage() {
    const router = useRouter();

    const [parsedData, setParsedData] = useState<any[]>([]);
    const [isParsing, setIsParsing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPdfUploading, setIsPdfUploading] = useState(false);
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // ===============================
    // Download CSV Template
    // ===============================
    const handleDownloadTemplate = () => {
        const headers = [
            "registrationNo",
            "firstName",
            "lastName",
            "dateOfBirth",
            "gender",
            "bloodGroup",
            "religion",
            "currentClass",
            "section",
            "rollNo",
            "session",
            "fatherName",
            "motherName",
            "guardianPhone",
            "emergencyContact",
            "email",
            "presentAddress",
            "permanentAddress",
        ];

        const csvContent = headers.join(",");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "student_bulk_import_template.csv";
        link.click();
    };

    // ===============================
    // CSV Upload
    // ===============================
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsParsing(true);
        setError(null);
        setSuccessMessage(null);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data as any[];

                const validRows = data.filter(
                    (row) => row.registrationNo && row.firstName
                );

                if (validRows.length === 0) {
                    setError(
                        "CSV is empty or missing required columns (registrationNo, firstName)."
                    );
                    setParsedData([]);
                } else {
                    setParsedData(validRows);

                    if (validRows.length < data.length) {
                        setError(
                            `Warning: ${data.length - validRows.length} rows skipped due to missing required fields.`
                        );
                    }
                }

                setIsParsing(false);
            },
            error: (err) => {
                setError(`CSV Parse Error: ${err.message}`);
                setIsParsing(false);
            },
        });
    };

    // ===============================
    // Submit CSV Data
    // ===============================
    const handleSubmitAll = async () => {
        if (parsedData.length === 0) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await addMultipleStudents(parsedData);

            if (result.success) {
                setSuccessMessage(
                    `Successfully imported ${result.count} students (${result.skipped ?? 0
                    } duplicates skipped)`
                );
                setSuccess(true);

                setTimeout(() => {
                    router.push("/dashboard/principal/students");
                }, 3000);
            } else {
                setError(result.error || "Bulk upload failed.");
            }
        } catch {
            setError("Server error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ===============================
    // PDF Upload
    // ===============================
    const handlePdfUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            setError("Only PDF files are allowed.");
            return;
        }

        setPdfFile(file);
        setError(null);
        setSuccessMessage(null);

        try {
            setIsPdfUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload-pdf", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            const validRows = (data.data || []).filter(
                (row: any) => row.firstName || row.registrationNo
            );

            if (validRows.length === 0) {
                setError("AI was unable to extract any valid student records from the PDF.");
                setParsedData([]);
            } else {
                setParsedData(validRows);
                setSuccessMessage(`AI Successfully extracted ${validRows.length} students from the PDF! Please review the preview table and import.`);
            }
        } catch (err: any) {
            setError(err.message || "PDF processing failed.");
        } finally {
            setIsPdfUploading(false);
        }
    };

    // ===============================
    // Success Screen
    // ===============================
    if (success) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 pb-20 bg-gray-50/50">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-10 md:p-14 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center max-w-lg w-full"
                >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Import Successful
                    </h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        {successMessage}
                    </p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-emerald-500"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 3, ease: "linear" }}
                        />
                    </div>
                    <p className="text-sm text-gray-400 mt-4">Redirecting you to the student list...</p>
                </motion.div>
            </div>
        );
    }

    // ===============================
    // Main UI
    // ===============================
    return (
        <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10 pb-20">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 mb-2">
                            <button
                                onClick={() => router.back()}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                                Bulk Add Students
                            </h1>
                        </div>
                        <p className="text-gray-500 text-sm ml-11">
                            Import multiple students instantly via CSV or let our AI extract data from a PDF.
                        </p>
                    </div>

                    <Button onClick={handleDownloadTemplate} variant="outline" className="hidden md:flex shadow-sm hover:bg-gray-50">
                        <Download size={18} className="mr-2 text-blue-600" />
                        Download CSV Template
                    </Button>
                </div>

                {/* Error Banner */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-start shadow-sm"
                    >
                        <AlertCircle className="w-5 h-5 mr-3 mt-0.5 shrink-0 text-red-500" />
                        <span className="text-sm font-medium leading-relaxed">{error}</span>
                    </motion.div>
                )}

                {/* Success Banner (Non-Blocking) */}
                {successMessage && !success && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-start shadow-sm"
                    >
                        <Info className="w-5 h-5 mr-3 mt-0.5 shrink-0 text-emerald-600" />
                        <span className="text-sm font-medium leading-relaxed">{successMessage}</span>
                    </motion.div>
                )}




                {/* Upload Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* CSV Upload Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <Database size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Standard CSV Import</h3>
                                <p className="text-sm text-gray-500">Upload structured data directly.</p>
                            </div>
                        </div>

                        <div className="relative flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-all duration-200 group overflow-hidden">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                disabled={isParsing || isSubmitting}
                            />

                            <motion.div
                                animate={isParsing ? { rotate: 360 } : { y: [0, -5, 0] }}
                                transition={isParsing ? { repeat: Infinity, duration: 1, ease: "linear" } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className={`mb-4 ${isParsing ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500 transition-colors"}`}
                            >
                                {isParsing ? <RefreshCcw size={48} /> : <UploadCloud size={48} />}
                            </motion.div>

                            <p className="text-base font-medium text-gray-700 group-hover:text-blue-700 transition-colors text-center">
                                {isParsing ? "Parsing CSV Data..." : "Drag & Drop CSV Here"}
                            </p>
                            {!isParsing && (
                                <p className="text-xs text-gray-400 mt-2 text-center">
                                    or click to browse files
                                </p>
                            )}

                            {/* Mobile Template Download button */}
                            <Button onClick={(e) => { e.stopPropagation(); handleDownloadTemplate(); }} variant="link" className="mt-6 md:hidden text-xs text-blue-600">
                                Download Template First
                            </Button>
                        </div>
                    </div>

                    {/* AI PDF Upload Card */}
                    <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                        {/* AI Sparkle decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    AI Smart Import
                                    <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-100 text-indigo-700 py-0.5 px-2 rounded-full">Pro</span>
                                </h3>
                                <p className="text-sm text-gray-500">Extract tables from PDF files instantly.</p>
                            </div>
                        </div>

                        <div className={`relative flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 group overflow-hidden ${isPdfUploading ? 'border-indigo-300 bg-indigo-50/50' : 'border-gray-200 bg-gray-50/50 hover:bg-indigo-50/50 hover:border-indigo-300'}`}>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handlePdfUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                disabled={isPdfUploading || isSubmitting}
                            />

                            <motion.div
                                animate={isPdfUploading ? { opacity: [0.5, 1, 0.5] } : {}}
                                // transition={{ repeat: Infinity, text: "linear", duration: 1.5 }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                                className={`mb-4 ${isPdfUploading ? "text-indigo-500" : "text-gray-400 group-hover:text-indigo-500 transition-colors"}`}
                            >
                                {isPdfUploading ? <RefreshCcw size={48} className="animate-spin" /> : <FileUp size={48} />}
                            </motion.div>

                            <p className="text-base font-medium text-center transition-colors text-gray-700 group-hover:text-indigo-700">
                                {isPdfUploading ? "AI is analyzing document..." : (pdfFile ? pdfFile.name : "Upload Student List (PDF)")}
                            </p>

                            {!isPdfUploading && !pdfFile && (
                                <p className="text-xs text-gray-400 mt-2 text-center max-w-[200px]">
                                    Supports scanned documents and digital PDFs
                                </p>
                            )}

                            {isPdfUploading && (
                                <div className="w-3/4 max-w-[200px] bg-gray-200 rounded-full h-1.5 mt-4 overflow-hidden">
                                    <motion.div
                                        className="bg-indigo-500 h-1.5 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Data Preview Section */}
                {parsedData.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Data Preview</h3>
                                <p className="text-sm text-gray-500">
                                    Found <span className="font-bold text-gray-900">{parsedData.length}</span> records ready to import.
                                    {parsedData.length > 5 && " Showing first 5."}
                                </p>
                            </div>

                            <Button
                                onClick={handleSubmitAll}
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px] shadow-sm shadow-blue-200/50 relative overflow-hidden group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <RefreshCcw size={16} className="animate-spin mr-2" />
                                        Importing Data...
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-[250ms] ease-out group-hover:w-full" />
                                        <CheckCircle2 size={18} className="mr-2" />
                                        Confirm & Import All
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50/80 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 font-medium">Reg No</th>
                                        <th className="p-4 font-medium">Student Name</th>
                                        <th className="p-4 font-medium">Class/Section</th>
                                        <th className="p-4 font-medium">Roll No</th>
                                        <th className="p-4 font-medium">Guardian Phone</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {parsedData.slice(0, 5).map((row, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="p-4 font-medium text-gray-700">
                                                {row.registrationNo || <span className="text-red-400 italic">Missing</span>}
                                            </td>
                                            <td className="p-4">
                                                <div className="font-medium text-gray-900">{row.firstName} {row.lastName}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {row.currentClass || "?"} / {row.section || "?"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600">{row.rollNo || "-"}</td>
                                            <td className="p-4 text-gray-600">{row.guardianPhone || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}