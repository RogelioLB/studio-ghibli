import data from "../../data.json"

export default async function handler(req, res) {
    if (req.method === 'GET'){
        res.send(data.films)
    }
}