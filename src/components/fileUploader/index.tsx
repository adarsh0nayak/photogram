import "@uploadcare/react-uploader/core.css";
import { FileUploaderRegular, OutputCollectionState, OutputCollectionStatus } from "@uploadcare/react-uploader";
import "./index.css";
import { FileEntry } from "../../types";
import { useCallback } from "react";

interface IFileUploaderProps {
    fileEntry: FileEntry,
    onChange: (fileEntry: FileEntry) => void,
    preview: boolean
}

export function FileUploader ({fileEntry, onChange, preview}: Readonly<IFileUploaderProps>) {
    
    const handleChange = (items: OutputCollectionState<OutputCollectionStatus>) => {
        onChange({files: [...items.allEntries.filter((file) => file.status === 'success')]});
    };
    
    const handleRemoveClick = useCallback((uuid: string) => {
        onChange({files: fileEntry.files.filter(file => file.uuid !== uuid)});
    }, [fileEntry.files, onChange]);

    return (
        <div>
            <FileUploaderRegular
                pubkey="267985ec11bbbd9334e2"
                maxLocalFileSizeBytes={10000000}
                imgOnly={true}
                sourceList="local, url, gdrive, gphotos"
                classNameUploader="my-config uc-light"
                onChange={handleChange}
                multiple ={preview}
            />
            {preview ? <div className="grid  grid-cols-2 gap-4 mt-8">
                {fileEntry.files.map(file => (
                    <div className="relative" key={file.uuid}>
                        <img src={`${file.cdnUrl}/-/format/auto/-/quality/smart/-/stretch/fill/-/progressive/yes/`} alt={file.uuid as string} />
                        <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7">
                            <button className="text-slate-800 text-center" type="button" onClick={() => {handleRemoveClick(file.uuid as string)}}>X</button>
                        </div>
                    </div>
                ))}
            </div> : ""}
        </div>

    );
}