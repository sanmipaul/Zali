import {
  ApiSuccessResponse,
  ApiErrorResponse,
  ApiResponse,
  PaginatedResponse,
} from '../api';

describe('API Types', () => {
  describe('ApiSuccessResponse', () => {
    it('should create a valid success response', () => {
      const response: ApiSuccessResponse<{ id: string; name: string }> = {
        success: true,
        data: { id: '1', name: 'Test' },
        requestId: 'req-123',
      };

      expect(response.success).toBe(true);
      expect(response.data.id).toBe('1');
      expect(response.requestId).toBe('req-123');
    });
  });

  describe('ApiErrorResponse', () => {
    it('should create a valid error response', () => {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'TEST_ERROR',
          message: 'Test error message',
        },
        requestId: 'req-123',
      };

      expect(response.success).toBe(false);
      expect(response.error.code).toBe('TEST_ERROR');
      expect(response.error.message).toBe('Test error message');
    });
  });

  describe('ApiResponse', () => {
    it('should accept both success and error responses', () => {
      const successResponse: ApiResponse<string> = {
        success: true,
        data: 'test',
      };

      const errorResponse: ApiResponse<string> = {
        success: false,
        error: {
          code: 'ERROR',
          message: 'Error occurred',
        },
      };

      expect(successResponse.success).toBe(true);
      expect(errorResponse.success).toBe(false);
    });
  });

  describe('PaginatedResponse', () => {
    it('should create a paginated response', () => {
      const response: PaginatedResponse<{ id: number }> = {
        data: [{ id: 1 }, { id: 2 }],
        total: 100,
        page: 1,
        pageSize: 2,
        hasMore: true,
      };

      expect(response.data.length).toBe(2);
      expect(response.total).toBe(100);
      expect(response.hasMore).toBe(true);
    });
  });
});
