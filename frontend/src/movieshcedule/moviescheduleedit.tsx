import { useState } from 'react';
import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';

interface Schedule {
  id: number;
  date: string;
  time: string;
  theater: string;
}

export const MovieScheduleEdit = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 1, date: '2025-11-10', time: '14:00', theater: '1관' },
    { id: 2, date: '2025-11-10', time: '18:30', theater: '2관' },
  ]);

  const [newSchedule, setNewSchedule] = useState<Schedule>({
    id: 0,
    date: '',
    time: '',
    theater: '',
  });

  const handleAdd = () => {
    if (!newSchedule.date || !newSchedule.time || !newSchedule.theater) return;
    setSchedules([...schedules, { ...newSchedule, id: Date.now() }]);
    setNewSchedule({ id: 0, date: '', time: '', theater: '' });
  };

  const handleEdit = (id: number, field: keyof Schedule, value: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleDelete = (id: number) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <PageLayout>
      <ContentLayout>
        <h2 className="text-xl font-bold mb-4">🎬 상영정보 관리</h2>

        <div className="flex gap-2 mb-4">
          <Input
            type="date"
            value={newSchedule.date}
            onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
          />
          <Input
            type="time"
            value={newSchedule.time}
            onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
          />
          <Input
            placeholder="상영관"
            value={newSchedule.theater}
            onChange={(e) => setNewSchedule({ ...newSchedule, theater: e.target.value })}
          />
          <Button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">
            추가
          </Button>
        </div>

        <table className="w-full border-collapse border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">날짜</th>
              <th className="border p-2">시간</th>
              <th className="border p-2">상영관</th>
              <th className="border p-2">관리</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id}>
                <td className="border p-2">
                  <Input
                    type="date"
                    value={s.date}
                    onChange={(e) => handleEdit(s.id, 'date', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <Input
                    type="time"
                    value={s.time}
                    onChange={(e) => handleEdit(s.id, 'time', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <Input
                    value={s.theater}
                    onChange={(e) => handleEdit(s.id, 'theater', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <Button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentLayout>
    </PageLayout>
  );
};
