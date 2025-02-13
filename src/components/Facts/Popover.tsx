import React from 'react';
import { Languages } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Language } from '@/app/types';

type PopoverComponentProps = {
  language: Language;
  handleLanguageChange: (value: Language) => void;
};

function PopoverComponent({
  language,
  handleLanguageChange,
}: PopoverComponentProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Language</h4>
          <RadioGroup
            value={language}
            onValueChange={(value: Language) => handleLanguageChange(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en" id="en" />
              <Label htmlFor="en">English</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="de" id="de" />
              <Label htmlFor="de">German</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverComponent;
