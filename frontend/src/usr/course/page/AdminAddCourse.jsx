import React, { useState } from 'react';

function AdminAddCourse() {
  const [formData, setFormData] = useState({ name: '', description: '', placeId: '' });

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/usr/datecourses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="코스 이름"
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <textarea
        placeholder="코스 설명"
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="장소 ID"
        onChange={e => setFormData({ ...formData, placeId: e.target.value })}
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        코스 추가
      </button>
    </form>
  );
}

export default AdminAddCourse;
