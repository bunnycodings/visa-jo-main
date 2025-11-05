'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/admin/DashboardLayout';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  admin_notes: string | null;
  created_at: string;
  read_at: string | null;
}

export default function ContactInboxPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [stats, setStats] = useState({
    new: 0,
    read: 0,
    replied: 0,
    archived: 0,
    total: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchMessages();
  }, [selectedStatus, router]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const statusParam = selectedStatus !== 'all' ? `&status=${selectedStatus}` : '';
      const response = await fetch(`/api/admin/contact-messages?status=${selectedStatus}${statusParam}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        
        // Calculate stats
        const allMessagesResponse = await fetch('/api/admin/contact-messages?status=all', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (allMessagesResponse.ok) {
          const allData = await allMessagesResponse.json();
          const allMessages = allData.messages || [];
          setStats({
            new: allMessages.filter((m: ContactMessage) => m.status === 'new').length,
            read: allMessages.filter((m: ContactMessage) => m.status === 'read').length,
            replied: allMessages.filter((m: ContactMessage) => m.status === 'replied').length,
            archived: allMessages.filter((m: ContactMessage) => m.status === 'archived').length,
            total: allMessages.length,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: number, status: string, notes?: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/contact-messages', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status,
          admin_notes: notes || adminNotes,
        }),
      });

      if (response.ok) {
        fetchMessages();
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/contact-messages?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchMessages();
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading messages...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Inbox</h1>
          <p className="text-gray-600 mt-2">Manage and respond to contact form submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="text-sm text-blue-600">New</div>
            <div className="text-2xl font-bold text-blue-900">{stats.new}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <div className="text-sm text-yellow-600">Read</div>
            <div className="text-2xl font-bold text-yellow-900">{stats.read}</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-sm text-green-600">Replied</div>
            <div className="text-2xl font-bold text-green-900">{stats.replied}</div>
          </div>
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Archived</div>
            <div className="text-2xl font-bold text-gray-900">{stats.archived}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow mb-4">
              <div className="p-4 border-b border-gray-200">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Messages</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No messages found</div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message);
                        setAdminNotes(message.admin_notes || '');
                        if (message.status === 'new') {
                          updateMessageStatus(message.id, 'read');
                        }
                      }}
                      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                        message.status === 'new' ? 'bg-blue-50' : ''
                      } ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-gray-900">{message.name}</div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          message.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                          message.status === 'replied' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {message.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 truncate">{message.email}</div>
                      {message.subject && (
                        <div className="text-sm font-medium text-gray-800 mt-1 truncate">
                          {message.subject}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDate(message.created_at)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.name}</h2>
                      <div className="text-gray-600 mt-1">{selectedMessage.email}</div>
                      {selectedMessage.phone && (
                        <div className="text-gray-600">{selectedMessage.phone}</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark as Replied
                      </button>
                      <button
                        onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Archive
                      </button>
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {selectedMessage.subject && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-600">Subject</div>
                      <div className="font-semibold text-gray-900">{selectedMessage.subject}</div>
                    </div>
                  )}
                  <div className="mt-4 text-sm text-gray-500">
                    Received: {formatDate(selectedMessage.created_at)}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Message</h3>
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-800 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Admin Notes
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      onBlur={() => updateMessageStatus(selectedMessage.id, selectedMessage.status, adminNotes)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add notes about this message..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`mailto:${selectedMessage.email}${selectedMessage.subject ? `?subject=Re: ${encodeURIComponent(selectedMessage.subject)}` : ''}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-gray-400 text-lg">Select a message to view details</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

