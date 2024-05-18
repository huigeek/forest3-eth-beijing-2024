'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

function SettingGoals() {
  return (
    <Tabs defaultValue="join" className="space-y-4">
      <TabsList>
        <TabsTrigger value="join">Join Group</TabsTrigger>
        <TabsTrigger value="create">Create Group</TabsTrigger>
      </TabsList>
      <TabsContent value="join" className="space-y-4">
        <div>
          <h1>Join</h1>
        </div>
      </TabsContent>
      <TabsContent value="create" className="space-y-4">
        <div>
          <h1>Create</h1>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default SettingGoals;