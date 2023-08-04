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
			<p>Cidade: {cidade ? cidade : "Cidade não localizada"}</p>
			<p>Logradouro: {logradouro ? logradouro : "Logradouro não localizado"}</p>
			<p>Localidade: {localidade ? localidade : "Localidade não encontrada"}</p>
			<p>Estado: {uf ? uf : "Estado não localido"}</p>
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
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "10px",
			}}
		>
			<label htmlFor="cep">Insira um Cep:</label>
			<input
				value={cep}
				type="text"
				name="cep"
				onChange={(ev) => setCep(ev.target.value)}
			/>
			<button onClick={getCep}>Enviar</button>

			<CepComponent
				cidade={data.cidade}
				localidade={data.localidade}
				logradouro={data.logradouro}
				uf={data.uf}
			/>
		</div>
	);
}

export default App;
