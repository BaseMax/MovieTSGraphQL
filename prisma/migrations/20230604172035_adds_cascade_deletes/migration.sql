-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_movieId_fkey";

-- DropForeignKey
ALTER TABLE "DownloadableAssets" DROP CONSTRAINT "DownloadableAssets_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieArtist" DROP CONSTRAINT "MovieArtist_artistId_fkey";

-- DropForeignKey
ALTER TABLE "MovieArtist" DROP CONSTRAINT "MovieArtist_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieLanguage" DROP CONSTRAINT "MovieLanguage_movieId_fkey";

-- AddForeignKey
ALTER TABLE "MovieLanguage" ADD CONSTRAINT "MovieLanguage_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadableAssets" ADD CONSTRAINT "DownloadableAssets_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieArtist" ADD CONSTRAINT "MovieArtist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieArtist" ADD CONSTRAINT "MovieArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
