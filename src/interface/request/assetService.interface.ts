export interface StoreAssetService {
  itemBelanjaId?: number | null;
  assetId?: string;
  assetHolderId?: number | null;
  type?: string;
  pajak5Tahun?: string;
  pembayaranPajak?: string;
  nominalBayar?: number;
  startServis?: string;
  endServis?: string;
  nominalServis?: number;
  servicesKe?: number;
  nomorSurat?: string;
  tanggalSurat?: string;
}
