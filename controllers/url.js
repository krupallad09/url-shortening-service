import shortid from "shortid";
import URL  from '../models/url.js';

export async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});
    const shortID = shortid();
    await URL.create({
        shortID: shortID, 
        redirectURL: body.url, 
        visitHistory: [],
    });

    return res.json({id: shortID});
}

export default { handleGenerateNewShortURL };