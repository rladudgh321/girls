"use client"

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPostAPI, uploadImageAPI } from "../api/post";
import { getTags } from "../api/tag";
import { tagObject } from "../types";
import { useRouter } from "next/navigation";
const CreatePost = () => {
  const router = useRouter();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      content1: "",
      content2: "",
      content3: "",
      tags: [],
      images1: [] as File[],
      images2: [] as File[],
      images3: [] as File[],
    }
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imagePreview1, setImagePreview1] = useState<{src: string}[]>([]);
  const [imagePreview2, setImagePreview2] = useState<{src: string}[]>([]);
  const [imagePreview3, setImagePreview3] = useState<{src: string}[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  });

  const mutationCreatePost = useMutation({
    mutationFn: createPostAPI,
    onSuccess: () => {
      return router.replace('/');
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    }
  });

  

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleImageUpload1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previewUrls = Array.from(files).map(file => ({src: URL.createObjectURL(file)}));
      setImagePreview1(previewUrls);
      setValue("images1", Array.from(files));
    }
  };

  const handleImageUpload2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previewUrls = Array.from(files).map(file => ({src: URL.createObjectURL(file)}));
      setImagePreview2(previewUrls);
      setValue("images2", Array.from(files));
    }
  };

  const handleImageUpload3 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previewUrls = Array.from(files).map(file => ({src: URL.createObjectURL(file)}));
      setImagePreview3(previewUrls);
      setValue("images3", Array.from(files));
    }
  };

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("authorization")!;
     // 각 필드를 별도로 업로드
     try {
       const [uploadResult1, uploadResult2, uploadResult3] = 
         await Promise.all([uploadImageAPI(data.images1), uploadImageAPI(data.images2), uploadImageAPI(data.images3)])
     
         const newPost = {
           title: data.title,
           content1: data.content1,
           content2: data.content2,
           content3: data.content3,
           tags: selectedTags,
           images1: uploadResult1 ? uploadResult1.map((url: string) => ({ src: url })) : [],
           images2: uploadResult2 ? uploadResult2.map((url: string) => ({ src: url })) : [],
           images3: uploadResult3 ? uploadResult3.map((url: string) => ({ src: url })) : [],
           token,
         };
         mutationCreatePost.mutate(newPost);
     } catch (err) {
      console.error('uploadsubmit', err);
     }
  };

  if(isLoading) return <div>isLoading....</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* 아코디언 제목 */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsAccordionOpen(prev => !prev)}
      >
        <h1 className="text-3xl font-extrabold text-gray-900">새 게시글 작성</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform ${isAccordionOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7l7 7 7-7"
          />
        </svg>
      </div>

      {/* 아코디언 내용 */}
      {isAccordionOpen && (
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-6">
          {/* 제목 입력 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              제목
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="title"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="제목을 입력하세요"
                />
              )}
            />
            {errors.title && <span className="text-red-500 text-sm">제목은 필수입니다.</span>}
          </div>

          {/* 내용 입력 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              내용
            </label>
            <Controller
              name="content1"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="content1"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="내용을 입력하세요"
                  rows={6}
                />
              )}
            />
          </div>

          {/* 이미지 업로드 */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              이미지 업로드
            </label>
            <input
              type="file"
              id="image1"
              name="image1"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleImageUpload1}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <div className="mt-4">
              {imagePreview1.map((src, index) => (
                <img key={index} src={src.src} alt={`preview-${index}`} className="w-32 h-32 object-cover rounded-md" />
              ))}
            </div>
          </div>
          
          {/* 내용 입력 */}
          <div>
            <label htmlFor="content2" className="block text-sm font-medium text-gray-700">
              내용
            </label>
            <Controller
              name="content2"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="content2"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="두번째입니다"
                  rows={6}
                />
              )}
            />
          </div>

          {/* 이미지 업로드 */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              이미지 업로드
            </label>
            <input
              type="file"
              id="image2"
              name="image2"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleImageUpload2}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <div className="mt-4">
              {imagePreview2.map((src, index) => (
                <img key={index} src={src.src} alt={`preview-${index}`} className="w-32 h-32 object-cover rounded-md" />
              ))}
            </div>
          </div>

          {/* 내용 입력 */}
          <div>
            <label htmlFor="content3" className="block text-sm font-medium text-gray-700">
              내용
            </label>
            <Controller
              name="content3"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="content3"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="내용을 입력하세요"
                  rows={6}
                />
              )}
            />
            {errors.content1 && <span className="text-red-500 text-sm">내용은 필수입니다.</span>}
          </div>

          {/* 이미지 업로드 */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              이미지 업로드
            </label>
            <input
              type="file"
              id="image3"
              name="image3"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleImageUpload3}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <div className="mt-4">
              {imagePreview3.map((src, index) => (
                <img key={index} src={src.src} alt={`preview-${index}`} className="w-32 h-32 object-cover rounded-md" />
              ))}
            </div>
          </div>

          {/* 태그 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">태그</label>
            <div className="flex space-x-3">
              {
             tags.map((v: tagObject) => v.name).map((tag: string) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${selectedTags.includes(tag) ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length === 0 && <span className="text-red-500 text-sm">적어도 하나의 태그를 선택하세요.</span>}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={mutationCreatePost.isPending}
          >
            {mutationCreatePost.isPending ? "게시글 생성 중..." : "게시글 생성"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePost;
