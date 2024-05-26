import { DialogTech } from "./dialog";
import loadingGif from "../../public/livros.gif";


export function Header(){
    return(
        <div className="w-full h-10 mb-10 flex justify-between items-center">
            <div className="flex space-x-2 justify-center items-center">
            <img src={loadingGif} alt="loading..." className="size-10"/>
            <h1 className="text-xl font-bold">Bookshop</h1>
            </div>

            <DialogTech />
        </div>
    )
}