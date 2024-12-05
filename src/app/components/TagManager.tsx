"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getTags, createTag, updateTag, deleteTag } from '../api/tag';

type Tag = {
  id: number;
  name: string;
};

type FormData = {
  name: string;
};

const TagManager = () => {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const queryClient = useQueryClient();

  // 태그 목록 조회
  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  });

  // 태그 생성, 수정, 삭제 뮤테이션
  const { mutate: create } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] }); // 태그 목록을 새로고침
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const { mutate: deleteTagMutation } = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  // react-hook-form 처리
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (selectedTag) {
      reset({ name: selectedTag.name });
    } else {
      reset({ name: '' }); // 선택된 태그가 없으면 폼 초기화
    }
  }, [selectedTag, reset]);

  const onSubmit: SubmitHandler<FormData> = useCallback((data) => {
    const token = localStorage.getItem('authorization')!; // localStorage에서 토큰 가져오기

    if (selectedTag) {
      update({ id: selectedTag.id, name: data.name, token }); // 태그 수정
    } else {
      create({ token, name: data.name }); // 태그 생성
    }
  }, [create, selectedTag, update]);

  const handleDelete = useCallback((id: number) => {
    const token = localStorage.getItem('authorization')!; // localStorage에서 토큰 가져오기
    deleteTagMutation({ id, token }); // 태그 삭제
  }, [deleteTagMutation]);

  const handleSelectTag = useCallback((tag: Tag) => {
    setSelectedTag(tag); // 선택된 태그 저장
  }, []);

  // 'Create' 상태로 돌아가는 함수
  const handleCreateNew = () => {
    setSelectedTag(null); // 선택된 태그 초기화
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Tag Manager</h2>

      {/* 태그 목록 */}
      <div className="mb-6">
        <h3 className="font-medium text-lg">Tags</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {tags?.map((tag: Tag) => (
              <li key={tag.id} className="flex items-center justify-between">
                <span>{tag.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSelectTag(tag)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 태그 생성 및 수정 폼 */}
      <div>
        <h3 className="font-medium text-lg mb-4">
          {selectedTag ? 'Edit Tag' : 'Create New Tag'}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 태그 이름 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Tag Name
            </label>
            <input
              id="name"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              {...register('name', { required: 'Tag name is required' })}
            />
          </div>

          {/* 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {selectedTag ? 'Update Tag' : 'Create Tag'}
            </button>
          </div>
        </form>

        {/* "Create New Tag" 버튼 추가 */}
        {selectedTag && (
          <button
            onClick={handleCreateNew}
            className="w-full mt-4 p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Create New Tag
          </button>
        )}
      </div>
    </div>
  );
};

export default TagManager;
