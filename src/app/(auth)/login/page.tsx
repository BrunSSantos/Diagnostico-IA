import Head from "next/head";

export default function Login() {
	return (

		<div className="relative bg-gray-700/20 h-120 w-120 border-2 border-cor-texto-principal/10 rounded-lg shadow-xl shadow-cor-texto-principal/10">
			<div className="absolute h-120 w-120 pl-14 pr-10 flex flex-col">
			<h2 className="text-cor-texto-principal/80 pt-5 font-medium text-4xl text-center tracking-widest">Login</h2>
			<div className="inputBox relative w-96 mt-9">
				<input type="text" className="relative w-96 pt-5 px-2.5 pb-2.5 bg-transparent border-none outline-none text-base tracking-wider z-20" required></input>
				<span className="absolute left-0 pt-5 px-0 pb-2.5 text-gray-400 text-base pointer-events-none tracking-wider transition ">Email</span>
				<i></i>
			</div>
			<div className="inputBox relative w-96 mt-9">
				<input type="text" className="relative w-96 pt-5 px-2.5 pb-2.5 bg-transparent border-none outline-none text-base tracking-wider z-20" required></input>
				<span className="absolute left-0 pt-5 px-0 pb-2.5 text-gray-400 text-base pointer-events-none tracking-wider transition">Senha</span>
				<i></i>
			</div>
			<div className="flex justify-between" >
				<div className="pt-2.5 pr-0">
				<label className="text-gray-400 text-sm pl-1 hover:text-cor-texto-principal/80 cursor-pointer"><input className="cursor-pointer accent-cor-texto-principal" type="checkbox"></input>Lembre-se de mim</label>
				</div>
				<a href="#" className="pt-2.5 pr-0 text-gray-400 hover:text-cor-texto-principal/80 text-sm">Esqueci a senha</a>
			</div>
			<div className="flex justify-center">
			<input className="border-none outline-none bg-cor-texto-principal/80  mt-8 w-32 h-12 rounded font-semibold cursor-pointer hover:bg-light-blue-700 shadow-xl hover:shadow-cyan-500/25 hover:text-gray-200/80 active:opacity-80" type="submit" value="Entrar"></input>
			</div>
			</div>
		</div>

	)
}