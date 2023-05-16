import data from "../../../data.json"
export default function handler(req, res) {
    const { id, lang="en" } = req.query
    if(!id) res.send({error:true,message:"No id provided"})
    const {films} = data[lang]
    const film = films.find((film)=>film.id === id)
    if(!film) res.send({message:"No film."})
    res.send(film)
}
  