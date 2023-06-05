import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { UploadModule } from '../upload/upload.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenresModule } from '../genres/genres.module';
import { ArtistsModule } from '../artists/artists.module';
import { MovieArtistResolver } from './movie-artist/movie-artist.resolver';

@Module({
  imports: [UploadModule, PrismaModule, GenresModule,ArtistsModule],
  providers: [MoviesService, MoviesResolver, MovieArtistResolver]
})
export class MoviesModule { }
