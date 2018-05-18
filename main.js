let numbers = [];
for(let i=0; i<10;i++)
{
    numbers.push(Math.floor(Math.random()*10)+1);
}

const newNumbers=numbers.filter(number => number % 2 !==0).map(number => number * number);

console.log("The new numbers are: "+newNumbers);

function getAjaxData(url, callback) {
    // Create new ajax call with the js function called XMLHttpRequest
    const request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        // This in here is our callback function
        // Check our server responsecode, 200 means ok, success: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes 
        if (this.status === 200) {
            callback(JSON.parse(request.responseText));
        } else {
            console.log('Something is probably wrong with the url');
        }
    });

    request.addEventListener('error', function () {
        console.log('Server error like timeout');
    });

    // initializes a request with an http method
    request.open("GET", url);
    // Sends the request 
    request.send();
}

function addTag(movie){
    let tag='';
    const rating=Math.floor(movie.rating);
    switch (rating){
        case 0:
        case 1:
        case 2:
        case 3:
            tag = 'Bad';
            break;
        case 4:
        case 5:
        case 6:
            tag = 'Average';
            break;
        case 7:
        case 8:
        case 9:
        case 10:
            tag = 'Good';
            break;
        default: 
            tag='';
            break;
    }
    
    return tag;
}

function findmatchKeys(movie){

    let foundKey=false;
    const title=movie.title;
    
    const seacrhKeys=["The", "dog", "who", "is", "not", "a", "man"];
    
    const titleListWords=title.split(" ");
    
    for(let i=0;i<seacrhKeys.length;i++){
        for(let j=0;j<titleListWords.length;j++){
            if(titleListWords[j]===seacrhKeys[i]){
                foundKey= true;
                break;
            }
        }
        if(foundKey===true){
            return movie.title;
        }
    }
}
getAjaxData('https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json' ,function(movies){

    console.log("All movies: "+movies);
    movies.map(movie => (movie.tag = addTag(movie)));
    console.log(movies);

    const totalRatingMovies= movies.reduce((sum,movie)=>(sum + movie.rating),0);
    const averageRatingMovie = totalRatingMovies/movies.length;

    console.log('total rating  movies is: '+ totalRatingMovies);
    console.log('average rating movies is: '+averageRatingMovie);

    //good movies
    const totalGoodMovies = movies.filter(movie => (movie.tag==='Good'));
    const countGoodMovies = totalGoodMovies.length;
    console.log("total good movies: "+countGoodMovies);

    //average movies
    const totalAverageMovies = movies.filter(movie => (movie.tag==='Average'));
    const countAverageMovies = totalAverageMovies.length;
    console.log("total average movies: "+countAverageMovies);

    //Bad movies
    const totalBadMovies = movies.filter(movie => (movie.tag==='Bad'));
    const countBadMovies = totalBadMovies.length;
    console.log("total bad movies: "+countBadMovies);

    //count all the movies that are in the searching keys
    
    const totalMoviesWithKeys= movies.filter(movie=> (movie.title=findmatchKeys(movie)));
    console.log("count movies with keys:");
    console.log(totalMoviesWithKeys);

    //count all the movies that is from the year between 1980 - 1989
    const totalMoviesfrom1980To1989 = movies.filter(movie =>(movie.year >=1980 && movie.year<=1989));
    const countMoviesfrom1980To1989Movies =totalMoviesfrom1980To1989.length;
    console.log("Count movies from 1980 to 1989: "+countMoviesfrom1980To1989Movies);
    
});


