'use client';
const moment = require('moment'); // pastikan moment sudah diinstall
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';
import { useEffect, useState } from 'react';
import Loading from './loading';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  BarChart,
  CircleDollarSign,
  ClipboardCheck,
  Flower2,
  Router,
} from 'lucide-react';
import { rupiahFormatter } from '@/utils/stringFormatter';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import OrderTable from './(order-table)/order-table';

function generateDataChart(data: number[]) {
  const labels = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'May',
    'Juni',
    'July',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return {
    labels,
    datasets: [
      {
        label: 'Total Pedapatan',
        data: data,
        backgroundColor: '#372948',
      },
    ],
  };
}

const countPercentage = (prev: number, current: number): number => {
  const slice = current - prev;
  return Math.round((slice / prev) * 100);
};

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [totalPesanan, setTotalPesanan] = useState(0);
  const [persentasePenjualan, setPersentasePenjualan] = useState(0);
  const [persentasePesanan, setPersentasePesanan] = useState(0);
  const [totalProduk, setTotalProduk] = useState(0);
  const [dataPenjualan, setDataPenjualan] = useState<null | {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }>(null);
  const [dataPesanan, setDataPesanan] = useState([]);
  moment.locale('id'); // Set locale ke bahasa Indonesia
  const monthName = moment().format('MMMM');
  const year = moment().format('YYYY');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('/api/statistic');
      if (response.ok) {
        const { result } = await response.json();
        const month = new Date().getMonth();
        setTotalPesanan(result.total_pesanan[month]);
        setTotalPenjualan(result.total_penjualan[month]);
        setTotalProduk(result.total_produk);
        setDataPenjualan(generateDataChart(result.total_penjualan));

        setPersentasePenjualan(
          countPercentage(
            result.total_penjualan[month - 1],
            result.total_penjualan[month],
          ),
        );
        setPersentasePesanan(
          countPercentage(
            result.total_pesanan[month - 1],
            result.total_pesanan[month],
          ),
        );
        setDataPesanan(result.total_pesanan);
        setLoading(false);
        return;
      }
      throw new Error('Dashboard Bermasalah');
    };
    fetchData();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // menghilangkan grid lines pada sumbu x
        },
      },
      y: {
        grid: {
          display: false, // menghilangkan grid lines pada sumbu y
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard-container md:ml-12 w-screen gap-x-4 px-6 pt-16 md:mt-0 md:pr-32  ">
        <div className="card-container w-full gap-x-4 gap-y-4 flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 ">
          <Card className="w-full h-[205px]">
            <CardHeader className="font-bold text-3xl text-primary pt-4 pb-0 ">
              Buat Pesanan
            </CardHeader>
            <CardContent className="font-medium text-primary py-0 pb-2">
              catat pesanan kustomer dengan cepat
            </CardContent>
            <CardFooter className="text-gray-500 ">
              <Button onClick={() => router.push('/orders/add')}>
                Pesanan Baru
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full h-[205px]">
            <CardHeader className="flex mt-4 flex-row items-center justify-between w-full">
              <div>
                <div className="font-medium text-primary">Total Penjualan</div>
                <div className="text-gray-300 text-xs">
                  {`Perbulan `}
                  {monthName}
                </div>
              </div>
              <CircleDollarSign size={30} color="#372948" />
            </CardHeader>
            <CardContent className="font-bold text-3xl text-primary py-0 pb-2">
              {rupiahFormatter(totalPenjualan)}
            </CardContent>
            <CardFooter className="text-gray-500 ">
              {persentasePenjualan === Infinity ||
              Number.isNaN(persentasePenjualan)
                ? 'Total Bulan Sebelumnya Tidak Ada'
                : persentasePenjualan < 0
                ? `${
                    persentasePenjualan * -1
                  }% lebih kecil dari penjualan bulan lalu`
                : `${persentasePenjualan}% lebih besar dari penjualan bulan lalu`}
            </CardFooter>
          </Card>
          <Card className="w-full h-[205px]">
            <CardHeader className="flex mt-4 flex-row items-center justify-between w-full">
              <div>
                <div className="font-medium text-primary">Total Pesanan</div>
                <div className="text-gray-300 text-xs">
                  {`Perbulan `}
                  {monthName}
                </div>
              </div>
              <ClipboardCheck size={30} color="#372948" />
            </CardHeader>
            <CardContent className="font-bold text-3xl text-primary py-0 pb-2">
              {totalPesanan}
            </CardContent>
            <CardFooter className="text-gray-500 ">
              {persentasePesanan === Infinity ||
              Number.isNaN(persentasePenjualan)
                ? 'Total Bulan Sebelumnya Tidak Ada'
                : persentasePesanan < 0
                ? `${
                    persentasePesanan * -1
                  }% lebih kecil dari total pesanan bulan lalu`
                : `${persentasePesanan}% lebih besar dari total pesanan bulan lalu`}
            </CardFooter>
          </Card>
          <Card className="w-full h-[205px]">
            <CardHeader className="flex mt-4 flex-row items-center justify-between w-full">
              <div>
                <div className="font-medium text-primary">Total Produk</div>
                <div className="text-gray-300 text-xs">
                  {`Perbulan `}
                  {monthName}
                </div>
              </div>
              <Flower2 size={30} color="#372948" />
            </CardHeader>
            <CardContent className="font-bold text-3xl text-primary py-0 pb-2">
              {totalProduk || 0}
            </CardContent>
            <CardFooter className="text-gray-500 ">Produk Siap Jual</CardFooter>
          </Card>
        </div>
        <div className="card-bottom-conteiner mt-4 w-screen flex  pr-12 md:pr-40 flex-col gap-y-4 md:flex-row gap-x-4">
          <Card className="w-full md:w-1/2 ">
            <CardHeader className="flex mt-4 flex-row items-center justify-between w-full">
              <div>
                <div className="font-medium text-primary">
                  Statistik Pendapatan Pertahun
                </div>
                <div className="text-gray-300 text-xs">
                  {`Pertahun `}
                  {year}
                </div>
              </div>
              <BarChart size={30} color="#372948" />
            </CardHeader>
            <CardContent className="h-[350px]">
              {dataPenjualan ? (
                <Bar options={options} data={dataPenjualan} />
              ) : (
                ''
              )}
            </CardContent>
          </Card>
          <div className="w-full md:w-1/2">
            <OrderTable />
          </div>
        </div>
      </div>
    </>
  );
}
