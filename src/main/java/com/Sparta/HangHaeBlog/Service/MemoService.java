package com.Sparta.HangHaeBlog.Service;

import com.Sparta.HangHaeBlog.Models.Memo;
import com.Sparta.HangHaeBlog.Models.MemoRepository;
import com.Sparta.HangHaeBlog.Models.MemoRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MemoService
{
    private final MemoRepository memoRepository;

    @Transactional
    public Long update(Long id, MemoRequestDTO requestDto) {
        Memo memo = memoRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        memo.update(requestDto);
        return memo.getId();
    }
}
