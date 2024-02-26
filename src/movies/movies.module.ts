import { Module } from '@nestjs/common';
import {MoviesController} from "./movies.controller";
import {MoivesService} from "./moives.service";

@Module({
    controllers:[MoviesController],
    providers:[MoivesService],

})
export class MoviesModule {}
