interface statusValue {
  text: string;
  color: string;
  keterangan: string;
}

interface OrderStatus {
  [key: string]: statusValue;
}

const orderStatus: OrderStatus = {
  PENDING: {
    text: 'Belum Dibayar',
    color: 'bg-yellow-500 py-1 px-2 h-fit text-white rounded-md text-xs',
    keterangan: 'Pesanan Belum Dibayarkan',
  },
  PAID: {
    text: 'Sudah Dibayar',
    color: 'bg-indigo-500 py-1 px-2 h-fit text-white rounded-md text-xs',
    keterangan: 'Pesanan Sudah Dibayarkan, menunggu konfirmasi penjual',
  },
  CANCELED: {
    text: 'GAGAL',
    color: 'bg-red-500 py-1 px-2 h-fit text-white rounded-md text-xs',
    keterangan: 'Pesanan Dibatalkan',
  },
  ACCEPT: {
    text: 'Diterima',
    color: 'bg-blue-500 py-1 px-2 h-fit text-white rounded-md text-xs',
    keterangan: 'Pesanan Diterima, masih dalam antrian pengerjaan',
  },
  ON_PROGRESS: {
    text: 'Diproses',
    color: 'bg-sky-500 py-1 px-2 h-fit text-white rounded-md text-xs',
    keterangan: 'Pesanan Dalam Pengerjaan',
  },
  READY: {
    text: 'Siap Diambil',
    color: 'bg-emerald-500 py-1 px-2 h-fit text-white rounded-md text-xs',
    keterangan: 'Pesanan Selesai, silahkan ambil dialamat yang tertera',
  },
  COMPLETE: {
    text: 'Selesai',
    color: 'bg-green-500 py-1 px-2 h-fit text-white rounded-md text-xs',
    keterangan: 'Pesanan Selsai, pesanan diterima pembeli',
  },
};

export default orderStatus;
