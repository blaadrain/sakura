'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';

const UploadModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      img: null,
    },
  });

  const onOpenChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imgFile = values.img?.[0];
      const songFile = values.song?.[0];

      if (!user || !imgFile || !songFile) {
        return toast.error('All fields are required');
      }

      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song upload');
      }

      const { data: imgData, error: imgError } = await supabaseClient.storage
        .from('images')
        .upload(`img-${values.title}-${uniqueId}`, imgFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imgError) {
        setIsLoading(false);
        return toast.error('Failed image upload');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user?.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          img_path: imgData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      toast.success('Song uploaded');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something wend wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an .mp3 file"
      isOpen={uploadModal.isOpen}
      onOpenChange={onOpenChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Author"
        />
        <div>
          <p className="pb-1 pl-1">Select an .mp3 file</p>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <p className="pb-1 pl-1">Select an image</p>
          <Input
            id="img"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('img', { required: true })}
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="mt-5"
        >
          Upload
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
