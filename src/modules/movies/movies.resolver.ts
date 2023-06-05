import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { MinRole } from '../auth/min-role.decorator';
import { Role } from '../users/user.model';
import { CreateMovieInput } from './dto/create-movie.input';
import { SearchMovieInput } from './dto/search-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.model';
import { MoviesService } from './movies.service';
import { PaginatedMovies } from './paginated-movies.model';

@Resolver()
export class MoviesResolver {
  constructor(private service: MoviesService) { }

  @Mutation(() => Movie)
  @UseGuards(AuthGuard)
  @MinRole(Role.admin)
  async createMovie(@Args("input") input: CreateMovieInput) {
    return this.service.create(input);
  }

  @Mutation(() => Movie)
  @UseGuards(AuthGuard)
  @MinRole(Role.admin)
  async updateMovie(@Args("input") input: UpdateMovieInput) {
    return this.service.update(input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  @MinRole(Role.admin)
  async deleteMovie(@Args("id") id: string) {
    await this.service.delete(id);
    return true;
  }

  @Query(() => Movie, { nullable: true })
  async movie(@Args("id") id: string) {
    return this.service.getMovieById(id);
  }
  @Query(() => PaginatedMovies)
  async searchMovie(@Args("input") input: SearchMovieInput) {
    return await this.service.search(input)
  }
}
