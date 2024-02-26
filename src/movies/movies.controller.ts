import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {MoivesService} from "./moives.service";
import {Movie} from "./entites/movies.entity";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService:MoivesService) {}

    @Get("/")
    getAllMovies():Movie[] {
        return this.moviesService.getAll();
    }
    // 쿼리값 조회 연습
    // @Get("search")
    // search(@Query("year") searching:string){
    //     return `we are searching for a movie made after : ${searching}`;
    // }

    @Get("/:id")
    getOne(@Param('id') movieId:number):Movie{
        return  this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData:CreateMovieDto){
        return this.moviesService.createMovie(movieData);
    }

    @Delete("/:id")
    deleteMove(@Param('id') movieId:number){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId:number, @Body() updateData:UpdateMovieDto){
        return this.moviesService.update(movieId,updateData);
    }



}
