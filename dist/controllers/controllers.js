import fetch from 'node-fetch';
const apiKey = 'bbddca63dc49b1854ee6fbfccd52f020';
const apiBaseUrl = 'http://api.themoviedb.org/3';
export const listOfMovies = async (req, res) => {
    const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
    try {
        const response = await fetch(nowPlayingUrl);
        const data = await response.json();
        res.render('index', {
            parsedData: data.results,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const findMovieById = async (req, res) => {
    const movieId = req.params.id;
    const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
    try {
        const response = await fetch(thisMovieUrl);
        const data = await response.json();
        res.render('single-movie', {
            parsedData: data,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const searchMovie = async (req, res) => {
    const userSearchTerm = encodeURI(req.body.movieSearch);
    const cat = req.body.cat;
    const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
    try {
        const response = await fetch(movieUrl);
        let data = await response.json();
        if (cat == 'person') {
            data = data.results[0].known_for;
            res.render('index', {
                parsedData: data,
            });
        }
        res.render('index', {
            parsedData: data.results,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=controllers.js.map