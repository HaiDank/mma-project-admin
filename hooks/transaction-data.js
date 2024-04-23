import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { getTransaction } from "../api/transaction";

export const transactionData = (
  page = 0,
  per_page = 3,
  sortBy = "id",
  sortDir = "ASC",
  walledId = "",
  paymentMethod = "CARD",
  status = "PENDING",
  content = '',
  transactionCode = "",
  orderId = "",
  userId = ""
) => {
  const { authState } = useAuthContext();
  const { token } = authState;

  return useQuery({
    queryKey: [
      "transactions",
      page,
      per_page,
      sortBy,
      sortDir,
      walledId,
      paymentMethod,
      content,
      status,
      transactionCode,
      orderId,
      userId,
    ],
    queryFn: () =>
      getTransaction(
        token,
        page,
        per_page,
        sortBy,
        sortDir,
        walledId,
        paymentMethod,
        content,
        status,
        transactionCode,
        orderId,
        userId
      ),
    placeholderData: keepPreviousData,
    enabled: !!token,
    staleTime: 360000,
  });
};
