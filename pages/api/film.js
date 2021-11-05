// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {title} = req.body;
        const result = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${title} trailer studio ghibli&key=${process.env.KEY}`);
        const data = await result.json();
        const [firstItem] = data.items;
        console.log(data)
        res.status(200).json({id:firstItem.id.videoId})
    }else res.json({message:"No"})
}
  