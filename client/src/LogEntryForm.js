import React,{useState} from 'react';
import { useForm } from 'react-hook-form';

import {createLogEntry} from './API';

const LogEntryForm = ({location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
   try {
    data.latitude = location.latitude;
    data.longitude = location.longitude;
    const created = await createLogEntry(data);
    console.log(created);
    onClose();
   } catch (error) {
    console.error(error);
    setError(error.message);
    setLoading(false);
   }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
    {error ? <h3 className="error">{error}</h3> : null}
    <label htmlFor="api_key">API KEY</label>
    <input
      type="password"
      name="apikey"
      {...register("apikey", {
        required: "Required",
      })}
    />
    <label htmlFor="title">Title</label>
    <input
      name="title"
      {...register("title", {
        required: "Required",
      })}
    />
    <label htmlFor="comments">Comments</label>
    <textarea 
    name="comments" 
    rows={3}
    {...register("comments", {
      required: "Required",
    })}
    ></textarea>
    <label htmlFor="description">Description</label>
    <textarea 
    name="description" 
    rows={3}
    {...register("description", {
      required: "Required",
    })}
    ></textarea>
    <label htmlFor="image">Image</label>
    <input
      name="image"
      {...register("image", {
        required: "Required",
      })}
    />
    <label htmlFor="visitDate">Visit Date</label>
    <input
      name="visitDate"
      type="date"
      {...register("visitDate", {
        required: "Required",
      })}
    />
    <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
  </form>
  );
};

export default LogEntryForm;