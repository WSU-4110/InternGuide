export interface IStorageStrategy {
  /**
   * Upload a file buffer to storage
   * @param bucket - storage bucket name
   * @param path - destination path/filename in the bucket
   * @param buffer - file data buffer
   * @param contentType - MIME type
   */
  uploadFile(bucket: string, path: string, buffer: Buffer, contentType?: string): Promise<{ data?: any; error?: any }>
}
