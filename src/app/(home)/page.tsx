import Head from "next/head";
import { Sun } from 'lucide-react'


export default function Home() {
  return (
    <> <nav className="flex justify-between items-center p-4 text-white">
      <div className="flex items-center">
        <img src="/img/cardiogram.png" alt="Logo" className="h-12 mr-4" />
      </div>
      <div className="pr-12">
      <a href="/login" className="bg-blue-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-10">Fazer Login</a>
      </div>
    </nav>
      <div className="w-full h-4/5 flex flex-row mt-24">
        <div className="pl-14 pt-14">
          <h1 className="text-blue-gray-100 text-7xl pl-12">Boa noite</h1>
          <h2 className="text-light-blue-700 pt-2 text-5xl pl-12 pr-48 " >Sou seu assistente de diagnósticos para todos os dias</h2>
          <p className="text-blue-gray-100 pt-4 pl-14 pr-52">
          A prática da medicina é uma arte, não um comércio, 
          um chamado, não um negócio, um chamado em 
          que seu coração será exercitado igualmente 
          a sua cabeça
          </p>
          <p className="text-blue-gray-100 pl-96">-William Osler</p>
          <button className="mt-10 pl-14"></button>
          <a href="/login" className="bg-blue-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-10">Acessar</a>

        </div>
        <div className="w-full h-3/5 pt-14 pl-36">
          <img src="/img/pngwing.com.png" className="w-96"></img>
        </div>
      </div></>

  )
}
