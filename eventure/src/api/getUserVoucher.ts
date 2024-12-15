import axios from "axios";

interface CheckVoucherClaimParams {
  userId: number;
  eventId: number;
}

export const checkVoucherClaim = async ({
  userId,
}: CheckVoucherClaimParams): Promise<number[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}/voucher`
    );
    const claimedVouchers = response.data.data.map(
      (voucher: { voucherId: number }) => voucher.voucherId
    );
    return claimedVouchers;
  } catch (error) {
    console.error("Error checking voucher claim status:", error);
    return [];
  }
};
