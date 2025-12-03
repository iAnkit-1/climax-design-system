import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectFormData } from "@/pages/ProjectSubmission";

interface Props {
  data: ProjectFormData;
  updateData: (data: Partial<ProjectFormData>) => void;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function LocationForm({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Project Location
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Specify the geographic location of your project
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="state" className="text-foreground">
            State <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.state}
            onValueChange={(value) => updateData({ state: value })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="district" className="text-foreground">
              District <span className="text-destructive">*</span>
            </Label>
            <Input
              id="district"
              value={data.district}
              onChange={(e) => updateData({ district: e.target.value })}
              placeholder="e.g., Bangalore Urban"
              className="mt-1.5"
            />
          </div>
          
          <div>
            <Label htmlFor="pincode" className="text-foreground">
              Pincode <span className="text-destructive">*</span>
            </Label>
            <Input
              id="pincode"
              value={data.pincode}
              onChange={(e) => updateData({ pincode: e.target.value })}
              placeholder="e.g., 560001"
              maxLength={6}
              className="mt-1.5"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="address" className="text-foreground">
            Full Address
          </Label>
          <Textarea
            id="address"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="Enter complete project address"
            className="mt-1.5"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
