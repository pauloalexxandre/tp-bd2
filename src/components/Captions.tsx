import { ArrowLeft } from "lucide-react";

interface CaptionsProps {
    isOpen: boolean;
    onClose: () => void;

}
export function Captions({isOpen, onClose}: CaptionsProps) {

    return (
        <aside className={`fixed top-0 bg-slate-50 h-[100vh] ${isOpen? "left-0"  :"-left-[26rem]"} duration-500  w-80 flex flex-col pb-10 pt-20 px-4 shadow-lg shad`}>
            <div className="w-full flex items-center justify-end ">
                <button onClick={()=>onClose()} className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-md"> <ArrowLeft/> </button>
            </div>
        </aside>
    )
}