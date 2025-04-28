export interface StoreAssetHolder {
  assetId?: string;
  userId?: string;
  noBast?: string;
  dokumenPendukung?: "BAST" | "DOKUMEN" | "DOKUMEN_LAIN";
  file?: string;
}
