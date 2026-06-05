"use client"

import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, File, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/features/store/store"
import { addFileMetadata, uploadFileThunk, removeFile } from "@/features/store/tasks/taskFilesSlice"
import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"
import { useTranslation } from "react-i18next"

export function FileUploader() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>()
    const files = useSelector((state: RootState) => state.taskFiles.items)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const uniqueId = `${Date.now()}-${file.name}`
            dispatch(addFileMetadata({
                id: uniqueId,
                name: file.name,
                size: file.size
            }))
            dispatch(uploadFileThunk({ id: uniqueId, file }))
        })
    }, [dispatch])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
            "application/pdf": [],
            "application/msword": [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
        },
    })

    return (
        <div className="w-full space-y-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors
                    ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"}`}
            >
                <input {...getInputProps()} />
                <UploadCloud className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2" />
                <p className="text-xs sm:text-sm font-medium text-[#141522]">
                    {isDragActive ? t("fileUploader.dropFiles") : t("fileUploader.dragFiles")}
                </p>
                <p className="text-[10px] sm:text-xs text-[#54577A] mt-1">{t("fileUploader.acceptedFormats")}</p>
            </div>

            {files.length > 0 && (
                <ul className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {files.map((file) => (
                        <li key={file.id} className="p-2 sm:p-3 bg-secondary/20 rounded-xl border space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                                <div className="flex items-center gap-2 truncate flex-1">
                                    <File className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                                    <span className="truncate text-[#141522] font-medium text-xs sm:text-sm">{file.name}</span>
                                    <span className="text-[10px] sm:text-xs text-[#54577A] shrink-0">
                                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 shrink-0 justify-end">
                                    {file.status === "uploading" && <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-primary" />}
                                    {file.status === "success" && <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />}
                                    {file.status === "failed" && <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />}

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-destructive"
                                        onClick={() => dispatch(removeFile(file.id))}
                                    >
                                        <X className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
                                    </Button>
                                </div>
                            </div>

                            {file.status === "uploading" && (
                                <Progress value={file.progress} className="h-1" />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}