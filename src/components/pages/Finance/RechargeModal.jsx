import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../../common";
import financeService from "../../../services/financeService";

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #1f2937;
`;

const ModalDescription = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
`;

const RechargeModal = ({ isOpen, onClose, userId, onSuccess }) => {
  const [credits, setCredits] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!userId) {
      setError("User ID is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const payload = { credits: Number(credits), email: email || undefined };
      const data = await financeService.initiateWalletPurchase(userId, payload);
      // Open authorization url in new window for user to complete payment
      if (data.authorization_url) {
        window.open(data.authorization_url, "_blank");
      } else if (data.paystack_response?.data?.authorization_url) {
        window.open(data.paystack_response.data.authorization_url, "_blank");
      }
      onSuccess && onSuccess(data);
      setCredits(1);
      setEmail("");
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.error || "Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader>
        <ModalTitle>Buy Credits</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {error && (
          <div
            style={{
              color: "#ef4444",
              marginBottom: "12px",
              padding: "10px",
              background: "#fee2e2",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}
        <FormGroup>
          <Label>Number of Credits</Label>
          <Input
            type="number"
            min="1"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label>Payer Email (optional)</Label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        <ModalDescription>
          You will be redirected to Paystack to complete the payment securely.
          After payment, your credits will be added automatically.
        </ModalDescription>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RechargeModal;
