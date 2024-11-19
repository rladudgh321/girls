-- DropForeignKey
ALTER TABLE `_posttags` DROP FOREIGN KEY `_PostTags_A_fkey`;

-- DropForeignKey
ALTER TABLE `_posttags` DROP FOREIGN KEY `_PostTags_B_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_postId_fkey`;
