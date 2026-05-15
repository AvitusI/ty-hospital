
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur flex items-center justify-between px-4">
      <div className="flex-1">
        <h1 className="text-lg font-medium">
          Ministry of Health TV Monitoring System
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 rounded-full"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            3
          </Badge>
        </Button>
        <Button variant="ghost" size="icon">
          <User size={20} />
        </Button>
      </div>
    </header>
  );
}
