import axios from "axios";

export interface ImpostometroResponse {
  Total: number;
  Federal: number;
  Estadual: number;
  Municipal: number;
}

const IMPOSTOMETRO_URL =
  "https://impostometro.com.br/Contador/Brasil";

export const fetchImpostometro = async (): Promise<ImpostometroResponse> => {
  const response = await axios.get(IMPOSTOMETRO_URL, {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "pt-BR,pt;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      referer: "https://impostometro.com.br/widget/contador/",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      "x-requested-with": "XMLHttpRequest",
    },
    timeout: 5000,
  });

  return response.data;
};
