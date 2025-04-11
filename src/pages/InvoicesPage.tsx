
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Plus, Search, FileText, Download, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock data for invoices
const invoicesMockData = Array.from({ length: 20 }, (_, i) => ({
  id: `INV-${1000 + i}`,
  customerName: `Customer ${i + 1}`,
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
  amount: `$${(Math.random() * 1000 + 500).toFixed(2)}`,
  status: ['Paid', 'Pending', 'Draft'][Math.floor(Math.random() * 3)],
}));

type Invoice = typeof invoicesMockData[number];

const InvoicesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [sortColumn, setSortColumn] = useState<keyof Invoice | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  
  const pageSize = 10;
  
  // Filter and sort data
  const filteredData = invoicesMockData.filter(invoice => 
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    
    if (sortDirection === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });
  
  // Paginate data
  const paginatedData = sortedData.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );
  
  const handleSort = (column: keyof Invoice) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCreateInvoice = () => {
    navigate('/create-invoice');
  };

  const columns = [
    {
      header: 'Invoice ID',
      accessorKey: 'id' as keyof Invoice,
      sortable: true,
    },
    {
      header: 'Customer',
      accessorKey: 'customerName' as keyof Invoice,
      sortable: true,
    },
    {
      header: 'Date',
      accessorKey: 'date' as keyof Invoice,
      sortable: true,
    },
    {
      header: 'Amount',
      accessorKey: 'amount' as keyof Invoice,
      sortable: true,
    },
    {
      header: 'Status',
      accessorKey: 'status' as keyof Invoice,
      sortable: true,
      cell: (invoice: Invoice) => {
        const statusColor = 
          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
          invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800';
          
        return (
          <Badge variant="outline" className={`${statusColor} font-medium`}>
            {invoice.status}
          </Badge>
        );
      }
    },
    {
      header: '',
      accessorKey: 'actions' as keyof Invoice,
      cell: (invoice: Invoice) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/invoices/${invoice.id}`)}>
              <FileText className="mr-2 h-4 w-4" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <Button onClick={handleCreateInvoice}>
          <Plus className="mr-2 h-4 w-4" /> New Invoice
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <DataTable
        data={paginatedData}
        columns={columns}
        onRowClick={(invoice) => navigate(`/invoices/${invoice.id}`)}
        pagination={{
          pageIndex,
          pageSize,
          pageCount: Math.ceil(filteredData.length / pageSize),
          onPageChange: setPageIndex,
        }}
        sorting={{
          column: sortColumn,
          direction: sortDirection,
          onSortChange: handleSort,
        }}
      />
    </div>
  );
};

export default InvoicesPage;
