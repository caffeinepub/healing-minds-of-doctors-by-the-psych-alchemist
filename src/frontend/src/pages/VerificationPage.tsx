import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVerifyMedicalForm, VerificationRole } from '../hooks/useQueries';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

type RoleTrack = 'student' | 'resident' | 'consultant';

const studentSubRoles = [
  'MBBS Student',
  'BDS Student',
  'Intern',
];

const residentSubRoles = [
  'PG Resident',
  'Senior Resident',
  'Super-speciality Resident',
  'MDS Resident',
];

const consultantSubRoles = [
  'Consultant',
  'Assistant Professor',
  'Associate Professor',
  'Professor',
];

export default function VerificationPage() {
  const [roleTrack, setRoleTrack] = useState<RoleTrack>('student');
  const [subRole, setSubRole] = useState('');
  const [institution, setInstitution] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [year, setYear] = useState('');
  const [registrationCouncil, setRegistrationCouncil] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  
  const verifyMutation = useVerifyMedicalForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields based on role track
    if (!institution.trim()) {
      toast.error('Institution is required');
      return;
    }

    if (!idNumber.trim()) {
      toast.error('ID/Registration number is required');
      return;
    }

    // Map role track to backend VerificationRole enum
    let backendRole: VerificationRole;
    if (roleTrack === 'student') {
      backendRole = VerificationRole.student;
    } else if (roleTrack === 'resident') {
      backendRole = VerificationRole.resident;
    } else {
      backendRole = VerificationRole.consultant;
    }

    verifyMutation.mutate({
      role: backendRole,
      institution: institution.trim(),
      idNumber: idNumber.trim(),
    });
  };

  const getSubRoles = () => {
    if (roleTrack === 'student') return studentSubRoles;
    if (roleTrack === 'resident') return residentSubRoles;
    return consultantSubRoles;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/bg-pattern-mandala.dim_1024x1024.png)',
          backgroundSize: '400px 400px'
        }}
      />

      <Card className="w-full max-w-2xl bg-card/70 backdrop-blur-md border-border/50 shadow-2xl shadow-primary/5 relative z-10">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mx-auto shadow-lg shadow-primary/10">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-primary mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Verification Required</span>
            </div>
            <CardTitle className="text-3xl font-bold">Medical Verification</CardTitle>
            <CardDescription className="text-base">
              Please verify your credentials to access the platform
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Track Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Select your role track:</Label>
              <RadioGroup value={roleTrack} onValueChange={(value) => setRoleTrack(value as RoleTrack)} className="space-y-3">
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-accent/30 transition-all cursor-pointer">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="font-medium cursor-pointer flex-1">Student</Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-accent/30 transition-all cursor-pointer">
                  <RadioGroupItem value="resident" id="resident" />
                  <Label htmlFor="resident" className="font-medium cursor-pointer flex-1">Resident</Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-accent/30 transition-all cursor-pointer">
                  <RadioGroupItem value="consultant" id="consultant" />
                  <Label htmlFor="consultant" className="font-medium cursor-pointer flex-1">Consultant</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Sub-role (optional) */}
            <div className="space-y-3">
              <Label htmlFor="subRole" className="text-base font-semibold">Specific Role (Optional)</Label>
              <Select value={subRole} onValueChange={setSubRole}>
                <SelectTrigger className="h-12 text-base rounded-xl border-border/50">
                  <SelectValue placeholder="Select your specific role" />
                </SelectTrigger>
                <SelectContent>
                  {getSubRoles().map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Institution */}
            <div className="space-y-3">
              <Label htmlFor="institution" className="text-base font-semibold">
                Institution <span className="text-destructive">*</span>
              </Label>
              <Input
                id="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder={roleTrack === 'student' ? 'College/University name' : 'Hospital/Institution name'}
                required
                className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>

            {/* ID/Registration Number */}
            <div className="space-y-3">
              <Label htmlFor="idNumber" className="text-base font-semibold">
                {roleTrack === 'student' ? 'Student ID' : 'Registration Number'} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="idNumber"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder={roleTrack === 'student' ? 'Enter your student ID' : 'Enter your registration number'}
                required
                className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>

            {/* Additional fields for residents */}
            {roleTrack === 'resident' && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="degree" className="text-base font-semibold">Degree (Optional)</Label>
                  <Input
                    id="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g., MD, MS, DNB, MDS, DM, MCh"
                    className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="specialty" className="text-base font-semibold">Specialty (Optional)</Label>
                  <Input
                    id="specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g., Internal Medicine, Surgery"
                    className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="registrationCouncil" className="text-base font-semibold">Registration Council (Optional)</Label>
                  <Input
                    id="registrationCouncil"
                    value={registrationCouncil}
                    onChange={(e) => setRegistrationCouncil(e.target.value)}
                    placeholder="e.g., MCI, State Medical Council"
                    className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
              </>
            )}

            {/* Additional fields for students */}
            {roleTrack === 'student' && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="university" className="text-base font-semibold">University (Optional)</Label>
                  <Input
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="University name"
                    className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="year" className="text-base font-semibold">Year of Study (Optional)</Label>
                  <Input
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g., 1st Year, 2nd Year"
                    className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
              </>
            )}

            {/* Additional fields for consultants */}
            {roleTrack === 'consultant' && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="specialty" className="text-base font-semibold">Specialty (Optional)</Label>
                  <Input
                    id="specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g., Cardiology, Neurology"
                    className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="yearsExperience" className="text-base font-semibold">Years of Experience (Optional)</Label>
                  <Input
                    id="yearsExperience"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    placeholder="e.g., 10"
                    type="number"
                    min="0"
                    className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="registrationCouncil" className="text-base font-semibold">Registration Council (Optional)</Label>
                  <Input
                    id="registrationCouncil"
                    value={registrationCouncil}
                    onChange={(e) => setRegistrationCouncil(e.target.value)}
                    placeholder="e.g., MCI, State Medical Council"
                    className="h-12 text-base rounded-xl border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              disabled={verifyMutation.isPending}
            >
              {verifyMutation.isPending ? 'Submitting...' : 'Submit for Verification'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
