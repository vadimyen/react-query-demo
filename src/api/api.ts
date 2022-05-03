import ky from "ky";

export const api = ky.create({ prefixUrl: "http://localhost:3004", retry: 0 });
