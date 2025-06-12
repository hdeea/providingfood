
import React, { useState } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import VoucherIssuanceForm from '../../components/Vouchers/VoucherIssuanceForm';
import VouchersList from '../../components/Vouchers/VouchersList';
import QRScanner from '../../components/Scanner/QRScanner';
import VoucherDetails from '../../components/Scanner/VoucherDetails';
import IndividualRequestsTable from '../../components/Individual/IndividualRequestsTable';
import IndividualDonorsTable from '../../components/Individual/IndividualDonorsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { VoucherIssuance, HelpRequest, IndividualDonor } from '../../types/individual';
import { mockVoucherIssuances, mockHelpRequests, mockIndividualDonors } from '../../data/individualMockData';
import { Heart, Ticket, Users, ScanQrCode, UserPlus } from 'lucide-react';

const AssociationDashboard: React.FC = () => {
  const [vouchers, setVouchers] = useState<VoucherIssuance[]>(mockVoucherIssuances);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(mockHelpRequests);
  const [donors, setDonors] = useState<IndividualDonor[]>(mockIndividualDonors);
  const [scannedVoucher, setScannedVoucher] = useState<VoucherIssuance | null>(null);
  const { toast } = useToast();

  const handleVoucherIssued = (newVoucher: VoucherIssuance) => {
    setVouchers(prev => [newVoucher, ...prev]);
  };

  const handleHelpRequestStatusChange = (requestId: string, newStatus: 'approved' | 'rejected') => {
    setHelpRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              status: newStatus === 'approved' ? 'approved' : 'rejected', 
              reviewedAt: new Date().toISOString(),
              notes: newStatus === 'approved' ? 'Request approved' : 'Request rejected'
            }
          : request
      )
    );

    toast({
      title: newStatus === 'approved' ? "Help request approved" : "Help request rejected",
      description: `Request ${requestId} status updated`,
    });
  };

  const handleDonorStatusChange = (donorId: string, newStatus: 'approved' | 'rejected') => {
    setDonors(prev => 
      prev.map(donor => 
        donor.id === donorId 
          ? { 
              ...donor, 
              status: newStatus, 
              reviewedAt: new Date().toISOString(),
              notes: newStatus === 'approved' ? 'Donation request approved' : 'Donation request rejected'
            }
          : donor
      )
    );

    toast({
      title: newStatus === 'approved' ? "Donation request approved" : "Donation request rejected",
      description: `Donation request ${donorId} status updated`,
    });
  };

  const handleQRScan = (qrData: string) => {
    // Find voucher by QR code (mock implementation)
    const foundVoucher = vouchers.find(v => v.qrCode === qrData) || {
      id: 'DEMO_001',
      beneficiaryId: 'USER_123',
      restaurantId: 'REST_001',
      issuedBy: 'admin',
      mealCount: 10,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      qrCode: qrData,
      status: 'active' as const,
      createdAt: new Date().toISOString(),
    };

    setScannedVoucher(foundVoucher);
  };

  const handleVoucherProcessed = () => {
    if (scannedVoucher) {
      setVouchers(prev => 
        prev.map(v => 
          v.id === scannedVoucher.id 
            ? { ...v, status: 'used' as const }
            : v
        )
      );
      setScannedVoucher(null);
    }
  };

  return (
    <DashboardLayout title="Association Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Ticket className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Vouchers</p>
                  <p className="text-2xl font-bold text-gray-900">{vouchers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Help Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{helpRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Donation Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{donors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserPlus className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {[...helpRequests, ...donors].filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="vouchers" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vouchers" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Food Vouchers
            </TabsTrigger>
            <TabsTrigger value="help-requests" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Help Requests
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Donation Requests
            </TabsTrigger>
            <TabsTrigger value="scanner" className="flex items-center gap-2">
              <ScanQrCode className="w-4 h-4" />
              QR Scanner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vouchers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <VoucherIssuanceForm onVoucherIssued={handleVoucherIssued} />
              </div>
              <div className="lg:col-span-2">
                <VouchersList vouchers={vouchers} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="help-requests">
            <IndividualRequestsTable 
              requests={helpRequests} 
              onStatusChange={handleHelpRequestStatusChange}
            />
          </TabsContent>

          <TabsContent value="donations">
            <IndividualDonorsTable 
              donors={donors} 
              onStatusChange={handleDonorStatusChange}
            />
          </TabsContent>

          <TabsContent value="scanner" className="space-y-6">
            {!scannedVoucher ? (
              <Card>
                <CardContent className="p-8">
                  <QRScanner onScan={handleQRScan} />
                </CardContent>
              </Card>
            ) : (
              <VoucherDetails 
                voucher={scannedVoucher}
                onProcessed={handleVoucherProcessed}
                onCancel={() => setScannedVoucher(null)}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AssociationDashboard;
