"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface FilterBarProps {
  showRole?: boolean;
  showGender?: boolean;
  showStatus?: boolean;
}

export function FilterBar({ showRole, showGender, showStatus }: FilterBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
      <Input
        placeholder="Search by email..."
        className="max-w-xs"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <div className="flex flex-wrap gap-2">
        {showRole && (
          <Select
            onValueChange={(val) => handleFilterChange("role", val)}
            defaultValue={searchParams.get("role")?.toString() || "all"}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="TEACHER">Teacher</SelectItem>
              <SelectItem value="STUDENT">Student</SelectItem>
            </SelectContent>
          </Select>
        )}

        {showGender && (
          <Select
            onValueChange={(val) => handleFilterChange("gender", val)}
            defaultValue={searchParams.get("gender")?.toString() || "all"}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        )}

        {showStatus && (
          <Select
            onValueChange={(val) => handleFilterChange("status", val)}
            defaultValue={searchParams.get("status")?.toString() || "all"}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="ALUMNI">Alumni</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {(searchParams.get("search") || searchParams.get("role") || searchParams.get("gender") || searchParams.get("status")) && (
             <Button 
               variant="ghost" 
               onClick={() => router.replace(pathname)}
             >
               Reset
             </Button>
        )}
      </div>
    </div>
  );
}
