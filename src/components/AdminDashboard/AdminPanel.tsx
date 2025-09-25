import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Upload, Users, MessageCircle, FileText, Settings, TrendingUp } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const stats = [
    { label: 'Total Conversations', value: '1,247', icon: MessageCircle, trend: '+12%' },
    { label: 'Active Users', value: '892', icon: Users, trend: '+8%' },
    { label: 'Knowledge Documents', value: '156', icon: FileText, trend: '+5%' },
    { label: 'Query Resolution Rate', value: '94%', icon: TrendingUp, trend: '+2%' },
  ];

  const recentQueries = [
    { query: 'Fee payment deadline', count: 45, language: 'English' },
    { query: 'Scholarship application process', count: 32, language: 'Hindi' },
    { query: 'Timetable for semester exam', count: 28, language: 'English' },
    { query: 'Library opening hours', count: 19, language: 'Marathi' },
    { query: 'Hostel accommodation', count: 15, language: 'English' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-responsive-xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your AI student support system</p>
          </div>
          <Button variant="gradient-primary">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-success font-medium">{stat.trend}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Popular Queries
                  </CardTitle>
                  <CardDescription>Most frequently asked questions this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQueries.map((query, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{query.query}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">{query.language}</Badge>
                            <span className="text-xs text-muted-foreground">{query.count} times</span>
                          </div>
                        </div>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full" 
                            style={{ width: `${(query.count / 50) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Language Distribution</CardTitle>
                  <CardDescription>User preferred languages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { lang: 'English', percentage: 45, count: '567 users' },
                      { lang: 'Hindi', percentage: 30, count: '378 users' },
                      { lang: 'Marathi', percentage: 15, count: '189 users' },
                      { lang: 'Tamil', percentage: 6, count: '76 users' },
                      { lang: 'Telugu', percentage: 4, count: '52 users' },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{item.lang}</span>
                          <span className="text-sm text-muted-foreground">{item.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-secondary h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Knowledge Documents
                </CardTitle>
                <CardDescription>Upload PDFs, documents, and other files to update the knowledge base</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Drop files here or click to upload</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, TXT files up to 10MB</p>
                  </div>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    className="mt-4"
                  />
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Uploaded Files:</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{file.name}</span>
                        <Badge variant="outline">Processing</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Recent Conversations</CardTitle>
                <CardDescription>Monitor ongoing and recent student interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: '1', student: 'Student #1247', query: 'Fee payment process', status: 'Resolved', time: '2 mins ago' },
                    { id: '2', student: 'Student #1246', query: 'Examination schedule', status: 'In Progress', time: '5 mins ago' },
                    { id: '3', student: 'Student #1245', query: 'Library access', status: 'Escalated', time: '10 mins ago' },
                    { id: '4', student: 'Student #1244', query: 'Hostel registration', status: 'Resolved', time: '15 mins ago' },
                  ].map((conversation) => (
                    <div key={conversation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{conversation.student}</p>
                        <p className="text-sm text-muted-foreground">{conversation.query}</p>
                        <p className="text-xs text-muted-foreground">{conversation.time}</p>
                      </div>
                      <Badge 
                        variant={conversation.status === 'Resolved' ? 'default' : 
                                conversation.status === 'In Progress' ? 'secondary' : 'destructive'}
                      >
                        {conversation.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};