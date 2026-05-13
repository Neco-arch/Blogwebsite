-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'publish');

-- CreateTable
CREATE TABLE "User" (
    "Userid" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Userid")
);

-- CreateTable
CREATE TABLE "Post" (
    "postid" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "poststatus" "PostStatus" NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postid")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentid" SERIAL NOT NULL,
    "author_username" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("Userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postid") ON DELETE RESTRICT ON UPDATE CASCADE;
