import { useState } from "react";

interface RetornoApi {
	logradouro: string;
	cidade: string;
	localidade: string;
	uf: string;
}

function CepComponent({ logradouro, cidade, localidade, uf }: RetornoApi) {
	return (
		<div>
			<p>{logradouro}</p>
			<p>{cidade}</p>
			<p>{localidade}</p>
			<p>{uf}</p>
		</div>
	);
}

function App() {
	const [cep, setCep] = useState("");

	const [data, setData] = useState<RetornoApi>({
		cidade: "",
		localidade: "",
		logradouro: "",
		uf: "",
	});

	function getCep() {
		fetch(`https://viacep.com.br/ws/${cep}/json/`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				const { cidade, logradouro, localidade, uf } = data;

				setData({
					cidade,
					logradouro,
					localidade,
					uf,
				});
			})
			.catch((error) => {
				console.error("Ocorreu um erro:", error);
			});
	}

	return (
		<>
			<input value={cep} type="text" onChange={(ev) => setCep(ev.target.value)} />
			<button onClick={getCep}>Enviar</button>

			<CepComponent
				cidade={data.cidade}
				localidade={data.localidade}
				logradouro={data.logradouro}
				uf={data.uf}
			/>
		</>
	);
}

export default App;
