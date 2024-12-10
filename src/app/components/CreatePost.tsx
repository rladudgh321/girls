"use client"

import { useForm, Controller } from "react-hook-form";
import { StringToArrayProps } from "../types";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPostAPI, uploadImageAPI } from "../api/post";
import { getTags } from "../api/tag";

const CreatePost = () => {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      images: [] as File[],
    }
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  });

  const mutationCreatePost = useMutation({
    mutationFn: createPostAPI,
    onSuccess: (data) => {
      // 게시글 생성 성공 후 처리
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    }
  });

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("authorization")!;
    console.log('Why', data);
    console.log('images', Array.from(data.images));
    const uploadResult = await uploadImageAPI(data.images); 
    console.log('uploadResult', uploadResult);
    const newPost = {
      title: data.title,
      content: data.content,
      tags: selectedTags,
      images: uploadResult.map((url: string) => ({ src: url })),
      token,
    };
    console.log('newPost', newPost);
    mutationCreatePost.mutate(newPost);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log('handleImageUpload files', files);
    if (files) {
      const previewUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setImagePreview(previewUrls);
      console.log('previewUrls', previewUrls);
      console.log('this is name is: ', files);
      setValue("images", Array.from(files));
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-6">
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
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="content"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="내용을 입력하세요"
                  rows={6}
                />
              )}
            />
            {errors.content && <span className="text-red-500 text-sm">내용은 필수입니다.</span>}
          </div>

          {/* 태그 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">태그</label>
            <div className="flex space-x-3">
              {
             tags.map((v) => v.name).map((tag) => (
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

          {/* 이미지 업로드 */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              이미지 업로드
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <div className="mt-4">
              {imagePreview.map((src, index) => (
                <img key={index} src={src} alt={`preview-${index}`} className="w-32 h-32 object-cover rounded-md" />
              ))}
            </div>
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