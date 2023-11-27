import Head from "next/head";
import {Sun} from 'lucide-react'


export default function Home() {
  return(
  <><header className="flex flex-row justify-between items-center">
      <div className="flex-col leading-3 ">
        <h1 className="font-extralight text-2xl text-slate-50 flex">Diagnostico por IA</h1>
      </div>
      <ul className="justify-between">
        <button className="px-4 mt-4"><Sun size={32} color="#ffffff"></Sun></button>
        <button type="button" className="bg-blue-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Acessar</button>
      </ul>
    </header><main className="flex flex-row mt-24">
        <aside>
          <h1 className="text-slate-100 text-2xl">Boa noite</h1>
          <p className="text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quaerat.
          </p>
          <button className="mt-10"></button>
          <a href="C:\Users\norua\tgdiagnostico-ia\src\app\auth\page.tsx'" className="bg-blue-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-10">Navegação</a>  
          
        </aside>
        <article>
          <img src="..\public\img\tesf-removebg-preview.png" className="w-96"></img>
        </article>
      </main></>
  
  )
}
