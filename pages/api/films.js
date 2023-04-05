import data from "../../data.json"

export default async function handler(req, res) {
    if (req.method === 'GET'){
        const {lang} = req.query
        res.send(data[lang].films)
    }
}